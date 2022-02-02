import { stripHtml } from "string-strip-html";

export default function sanitizeData(data) {
    return stripHtml(data).result.trim();
}
