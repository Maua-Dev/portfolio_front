import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as iam from 'aws-cdk-lib/aws-iam'

import { Construct } from 'constructs'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.STAGE || 'dev'
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN || ''
    const alternativeDomainName = process.env.ALTERNATIVE_DOMAIN_NAME || ''

    const s3Bucket = new s3.Bucket(this, 'PortfolioFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true
    })

    const oac = new cloudfront.CfnOriginAccessControl(this, 'AOC', {
      originAccessControlConfig: {
        name: 'Portfolio Front Bucket OAC ' + stage,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4'
      }
    })

    if (
      (stage === 'dev' || stage === 'homolog' || stage === 'prod') &&
      !acmCertificateArn
    ) {
      throw new Error(
        `ACM_CERTIFICATE_ARN é obrigatório para o stage: ${stage}`
      )
    }

    let domainNames: string[] = []

    if (alternativeDomainName) {
      domainNames.push(alternativeDomainName)
    }

    let viewerCertificate =
      cloudfront.ViewerCertificate.fromCloudFrontDefaultCertificate()

    if (stage === 'dev' || stage === 'homolog' || stage === 'prod') {
      viewerCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(
        Certificate.fromCertificateArn(
          this,
          'PortfolioFrontCertificate-' + stage,
          acmCertificateArn
        ),
        {
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          aliases: alternativeDomainName ? [alternativeDomainName] : undefined
        }
      )
    }

    const cloudFrontWebDistribution = new cloudfront.Distribution(this, 'CDN', {
      comment: 'Portfolio Front Distribution ' + stage,
      defaultBehavior: {
        origin: new origins.S3BucketOrigin(s3Bucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: 'index.html',
      certificate:
        stage !== 'dev' && stage !== 'homolog' && stage !== 'prod'
          ? undefined
          : Certificate.fromCertificateArn(
              this,
              'PortfolioFrontCertificate-' + stage,
              acmCertificateArn
            ),
      domainNames: domainNames.length > 0 ? domainNames : undefined,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        }
      ]
    })

    const cfnDistribution = cloudFrontWebDistribution.node
      .defaultChild as cloudfront.CfnDistribution

    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.getAtt('Id')
    )

    s3Bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        resources: [s3Bucket.arnForObjects('*')]
      })
    )

    new cdk.CfnOutput(this, 'PortfolioFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'PortfolioFrontDistributionId-' + stage, {
      value: cloudFrontWebDistribution.distributionId
    })

    new cdk.CfnOutput(this, 'PortfolioFrontDistributionDomainName-' + stage, {
      value: cloudFrontWebDistribution.distributionDomainName
    })

    if (alternativeDomainName) {
      new cdk.CfnOutput(this, 'PortfolioFrontAlternativeDomainName-' + stage, {
        value: alternativeDomainName
      })
    }
  }
}
