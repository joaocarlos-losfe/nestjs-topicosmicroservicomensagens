export type Message = {
    id: string;
    message: string;
    subject?: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}