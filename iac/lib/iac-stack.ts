import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.STAGE || 'dev'
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN || ''

    // ============ BUCKET PRINCIPAL ============
    const s3Bucket = new s3.Bucket(this, 'PortfolioFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true
    })

    // Certificado
    let viewerCertificate =
      cloudfront.ViewerCertificate.fromCloudFrontDefaultCertificate()

    if (stage === 'dev' || stage === 'homolog' || stage === 'prod') {
      if (!acmCertificateArn) {
        throw new Error(
          `ACM_CERTIFICATE_ARN é obrigatório para o stage: ${stage}`
        )
      }

      viewerCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(
        Certificate.fromCertificateArn(
          this,
          'PortfolioFrontCertificate-' + stage,
          acmCertificateArn
        ),
        {
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021
        }
      )
    }

    // CloudFront principal
    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'PortfolioCDN',
      {
        comment: 'Portfolio Front Distribution ' + stage,
        originConfigs: [
          {
            s3OriginSource: { s3BucketSource: s3Bucket },
            behaviors: [
              {
                isDefaultBehavior: true,
                allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
                compress: true,
                cachedMethods:
                  cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD,
                viewerProtocolPolicy:
                  cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
              }
            ]
          }
        ],
        viewerCertificate: viewerCertificate,
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: '/index.html'
          }
        ]
      }
    )

    // ============ REDIRECT www.portfolio.dev.devmaua.com ============
    const redirectBucket = new s3.Bucket(this, 'RedirectBucket' + stage, {
      bucketName: `www.portfolio.dev.devmaua.com-${stage}`, // precisa ser único
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteRedirect: {
        hostName: 'portfolio.dev.devmaua.com',
        protocol: s3.RedirectProtocol.HTTPS
      },
      publicReadAccess: true
    })

    const redirectDistribution = new cloudfront.Distribution(
      this,
      'RedirectDistribution',
      {
        defaultBehavior: {
          origin: new origins.HttpOrigin(
            `${redirectBucket.bucketWebsiteDomainName}`,
            {
              protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
            }
          ),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        },
        comment:
          'Redirect www.portfolio.dev.devmaua.com to portfolio.dev.devmaua.com',
        defaultRootObject: '',
        // se quiser https com www, precisa incluir esse domínio no certificado ACM
        certificate: undefined
      }
    )

    // Outputs
    new cdk.CfnOutput(this, 'PortfolioFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'PortfolioFrontDistributionDomainName-' + stage, {
      value: cloudFrontWebDistribution.distributionDomainName
    })

    new cdk.CfnOutput(this, 'RedirectDistributionDomainName-' + stage, {
      value: redirectDistribution.domainName
    })
  }
}
