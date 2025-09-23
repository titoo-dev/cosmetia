export enum UserStatus {
  NOT_VERIFIED = "NOT_VERIFIED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED"
}

export enum UserConnectionTypes {
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
  LINKEDIN = "LINKEDIN"
}

export enum UserRole {
  SUPPLIER = "SUPPLIER",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER"
}

export enum OrderItemStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DONE = "DONE",
  REJECTED = "REJECTED"
}

export enum OrderStatus {
  FORMULA_PENDING = "FORMULA_PENDING",
  FORMULA_REJECTED = "FORMULA_REJECTED",
  FORMULA_ACCEPTED = "FORMULA_ACCEPTED",
  CANCELLED = "CANCELLED"
}

export enum PackagingType {
  BOTTLE = "BOTTLE",
  JAR = "JAR",
  TUBE = "TUBE",
  BOX = "BOX",
  OTHER = "OTHER"
}

export enum PlanType {
  FREE = "FREE",
  PAY_AS_YOU_GO = "PAY_AS_YOU_GO",
  GROWTH = "GROWTH"
}

export enum AiMessageRole {
  USER = "USER",
  AI = "AI"
}

export enum LeadContext {
  VISIT_PROFILE = "VISIT_PROFILE",
  VISIT_PRODUCT = "VISIT_PRODUCT",
  VISIT_DOCUMENT = "VISIT_DOCUMENT",
  RESEARCH_RESULT = "RESEARCH_RESULT"
}

export interface UserEntity {
  id: string;
  email: string;
  password?: string;
  validationCode?: number;
  connectionType: UserConnectionTypes;
  role: UserRole;
  status: UserStatus;
  lastLogin: Date;
  createdAt: Date;
  supplier?: SupplierUserEntity;
  customer?: CustomerUserEntity;
  provider?: ProviderUserEntity;
  raisonForDelete?: string;
  deletedAt?: Date;
  validationResetPassword?: number;
}

export interface ProductEntity {
  id: string;
  id_seq: number;
  tradeName: string;
  description: string;
  pictureUrl?: string;
  inciName: string;
  certificate: string;
  pricePerQuantity: string;
  deliveryTime: string;
  regulationScore: number;
  minimumOrderQuantity: number;
  categories: ProductCategoryEntity[];
  documents: DocumentEntity[];
  functions: ProductFunctionEntity[];
  countries: ProductCountryEntity[];
  supplierId?: string;
  supplier?: SupplierUserEntity;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface ProductCategoryEntity {
  id: string;
  name: string;
}

export interface ProductFunctionEntity {
  id: string;
  name: string;
}

export interface ProductCountryEntity {
  id: string;
  name: string;
}

export interface DocumentEntity {
  id: string;
  name: string;
  technicalSheet: string;
  description: string;
  fileUrl: string;
  products: ProductEntity[];
  supplierId?: string;
  supplier?: SupplierUserEntity;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface SupplierUserEntity {
  id: string;
  userId: string;
  user: UserEntity;
  companyName: string;
  siretNumber: string;
  nameOfContact: string;
  phoneNumber: string;
  website: string;
  activityDescription: string;
  pictureId?: string;
  currentPlan: PlanType;
  products: ProductEntity[];
  documents: DocumentEntity[];
}

export interface CustomerUserEntity {
  id: string;
  userId: string;
  user: UserEntity;
  companyName: string;
  nameOfContact: string;
  phoneNumber: string;
  purchaseObjective: string;
  pictureId?: string;
  productsFavorite: ProductEntity[];
  documentsFavorite: DocumentEntity[];
  orders: OrderEntity[];
}

export interface ProviderUserEntity {
  id: string;
  userId: string;
  user: UserEntity;
  name: string;
  description: string;
  pictureId?: string;
  orders: OrderEntity[];
}

export interface OrderItemEntity {
  id: string;
  productId: string;
  product: ProductEntity;
  quantity: number;
  status: OrderItemStatus;
  orderId: string;
  order: OrderEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderEntity {
  id: string;
  reference: string;
  orderItems: OrderItemEntity[];
  finalResultFamily: string;
  finalResultName: string;
  finalResultQuantity: number;
  targetMarket: string;
  marketingAngle: string;
  formula: string;
  packagingType: PackagingType;
  estimatedTotalCost: number;
  status: OrderStatus;
  providerId?: string;
  provider?: ProviderUserEntity;
  customerId: string;
  customer: CustomerUserEntity;
  comments: OrderCommentEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCommentEntity {
  id: string;
  orderId: string;
  order: OrderEntity;
  userId: string;
  user: UserEntity;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadEntity {
  id: string;
  context: LeadContext;
  customerId: string;
  customer: CustomerUserEntity;
  supplierId?: string;
  supplier?: ProviderUserEntity;
  productId?: string;
  product?: ProductEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceForSupplierEntity {
  id: string;
  reference: string;
  planType: PlanType;
  amount: number;
  supplierId: string;
  supplier: SupplierUserEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiMessageEntity {
  id: string;
  text: string;
  role: AiMessageRole;
  aiGroupMessageId: string;
  aiGroupMessage: AiGroupMessageEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiGroupMessageEntity {
  id: string;
  messages: AiMessageEntity[];
  userId: string;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationEntity {
  id: string;
  name?: string;
  messages: MessageEntity[];
  users: ConversationUserEntity[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface ConversationUserEntity {
  userId: string;
  conversationId: string;
  user: UserEntity;
  conversation: ConversationEntity;
  joinedAt: Date;
}

export interface MessageEntity {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  sender: UserEntity;
  conversation: ConversationEntity;
  createdAt: Date;
  isSeen: boolean;
}
