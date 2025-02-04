export interface ClaimDetails {
  id: string;
  claimantName: string;
  claimantAddress: string;
  documentNumber: string;
  claimantEmail: string;
  claimantPhone: string;
  claimantRepresentative?: string;
  dateClaim: string;
  assetType: "PRODUCT" | "SERVICE";
  assetDescription: string;
  claimDescription: string;
  amountClaimed?: string;
}

export interface ClaimsResponse {
  statusCode: number;
  message: string;
  data: ClaimDetails;
}
