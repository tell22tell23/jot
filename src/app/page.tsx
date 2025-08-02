import { Footer } from "@/components/layout/footer";
import TextArea from "@/components/textarea";

export default function Home() {
    return (
        <main className="w-dvw h-dvh flex items-stretch font-mono">
            <section className="h-full bg-card w-1/4">
            </section>
            <section className="h-full w-full flex items-stretch flex-col">
                <TextArea />
                <Footer />
            </section>
        </main>
    );
}
