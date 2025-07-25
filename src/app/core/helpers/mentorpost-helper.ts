export class MentorPostHelper{
    // example:
    // Title: This is a title for blog post
    // Result: This-is-a-title-for-blog-post-123
    static createSlug(title: string): string{
        const slug = title.toLocaleLowerCase().replace(/\s+/g, '-');
        const randomThreeDigitNumber = Math.floor(Math.random() * 1000);

        return `${slug}-${randomThreeDigitNumber}`;
    }
}