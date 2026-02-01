// import "server-only";

export function sendEmail<Props>({ emailAddress, subject, template, data, attachments }: any) {
    console.log({
        emailAddress,
        subject,
        template,
        data,
        attachments,
    });
}
