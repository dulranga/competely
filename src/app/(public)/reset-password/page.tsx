import { FC, Suspense } from "react";
import ResetPageClient from "./pageClient";

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPageClient />
        </Suspense>
    );
};

export default Page;
