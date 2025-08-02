import { Footer } from "@/components/layout/footer";
import TextArea from "@/components/textarea";

export default function Home() {
    return (
        <main className="max-w-4xl mx-auto h-dvh flex items-stretch justify-center font-mono">
            <section className="h-full w-1/3">
            </section>
            <section className="max-w-2xl mx-auto h-full w-full flex items-stretch flex-col pt-6">
                <TextArea />
                <Footer />
            </section>
        </main>
    );
}
