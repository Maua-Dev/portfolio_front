export interface HomeCarouselMember {
  name: string;
  photoPath: string | null;
  area: string;
}

export interface QuoteCarouselMember {
  name: string;
  quote: string;
  photoPath: string | null;
  role: string;
}

export interface MemberCarouselMember {
  name: string;
  photoPath: string | null;
  email: string;
  role: string;
  phone: string;
}

export interface MemberInfoResponse {
  homeCarousel: HomeCarouselMember[];
  quoteCarousel: QuoteCarouselMember[];
  memberCarousel: MemberCarouselMember[];
}