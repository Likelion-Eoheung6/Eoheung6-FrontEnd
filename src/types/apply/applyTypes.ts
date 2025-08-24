export interface CreateClassRequest {
  infoId: number | null;
  title: string;
  content: string;
  tags: string[];
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string; // "YYYY-MM-DD"
  price: number;
  capacity: number;
  startTime: string; // "HH:mm:ss"
  endTime: string; // "HH:mm:ss"
}

export interface ClassDetailData {
  openId: number;
  infoId: number;
  isWished: boolean;
  title: string;
  content: string;
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  isFull: boolean;
  educationTag: string;
  moodTags: string[];
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  roadAddress: string;
  zipCode: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  mentorProfileImageUrl: string;
  mentorIntro: string;
}

export interface GetClassDetailResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ClassDetailData;
  timeStamp: string;
}

export interface ApplyClassRequest {
  toggleWished: boolean;
  count: number;
}

export interface ApplyClassData {
  // applicationId: number;
  // status: string;
  // message: string;
  orderId: string;
  itemName: string;
  quantity: string; // API 응답이 문자열일 수 있으므로 string으로 받습니다.
  totalPrice: string; // API 응답이 문자열일 수 있으므로 string으로 받습니다.
  customerEmail: string;
  customerId: string;
}

export interface ApplyClassResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ApplyClassData | null;
  timeStamp: string;
}

// 카카오페이 준비(ready) API 요청 타입
export interface KakaoPayReadyRequest {
  orderId: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
}

// 카카오페이 준비(ready) API 응답 데이터 타입
export interface KakaoPayReadyData {
  tid: string;
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
}

// 카카오페이 준비(ready) API 전체 응답 타입
export interface KakaoPayReadyResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: KakaoPayReadyData;
  timeStamp: string;
}

//
// 📌 User's custom instructions: Provide code in Tailwind CSS and TypeScript.
//

/**
 * 결제 취소 이력
 */
interface Cancel {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  canceledAt: string;
  transactionKey: string;
  receiptKey: string;
}

/**
 * 가상계좌 정보
 */
interface VirtualAccount {
  accountNumber: string;
  accountType: string;
  bankCode: string;
  customerName: string;
  dueDate: string;
  refundStatus: string;
  expired: boolean;
  settlementStatus: string;
}

/**
 * 카드 결제 정보
 */
interface Card {
  amount: number;
  issuerCode: string;
  acquirerCode: string;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
  isInterestFree: boolean;
  interestPayer: string;
}

/**
 * 계좌이체 정보
 */
interface Transfer {
  bankCode: string;
  settlementStatus: string;
}

/**
 * 현금영수증 정보
 */
interface CashReceipt {
  type: string;
  receiptKey: string;
  issueNumber: string;
  receiptUrl: string;
  amount: number;
  taxFreeAmount: number;
}

/**
 * 결제 실패 정보
 */
interface Failure {
  code: string;
  message: string;
}

/**
 * Toss Payments API 최종 결제 승인 응답 타입
 */
export interface TossPaymentResponse {
  mId: string;
  version: string;
  paymentKey: string;
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED';
  lastTransactionKey: string;
  orderId: string;
  orderName: string;
  requestedAt: string; // ISO 8601 형식
  approvedAt: string; // ISO 8601 형식
  useEscrow: boolean;
  cultureExpense: boolean;
  card: Card | null;
  virtualAccount: VirtualAccount | null;
  transfer: Transfer | null;
  mobilePhone: Record<string, unknown> | null; // 구체적인 타입은 API 문서 확인 필요
  giftCertificate: Record<string, unknown> | null; // 구체적인 타입은 API 문서 확인 필요
  cashReceipt: CashReceipt | null;

  /** @deprecated */
  cashReceipts: null;

  discount: Record<string, unknown> | null; // 구체적인 타입은 API 문서 확인 필요
  cancels: Cancel[] | null;
  secret: string | null;
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY';
  easyPay: Record<string, unknown> | null; // 구체적인 타입은 API 문서 확인 필요
  country: string;
  failure: Failure | null;
  isPartialCancelable: boolean;
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
  currency: 'KRW';
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  metadata: Record<string, any> | null;
  taxExemptionAmount: number;
  method:
    | '카드'
    | '가상계좌'
    | '계좌이체'
    | '휴대폰'
    | '문화상품권'
    | '도서문화상품권'
    | '게임문화상품권';
}
