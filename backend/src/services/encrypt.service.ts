import { genSalt, hash, compare } from "bcryptjs"
export const encrypt = async (text: string) => {
    const hashed = await hash(text, await genSalt());
    return hashed
}
export const compareHashed = async (text: string, textHashed: string) => {
    const isValid = await compare(text, textHashed)
    return isValid;
}