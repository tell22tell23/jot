import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import TextArea from "@/components/textarea";

export default function Home() {
    return (
        <main className="max-w-4xl mx-auto h-dvh flex items-stretch justify-center font-mono gap-x-4">
            <Sidebar />
            <section className="max-w-2xl mx-auto h-full w-full flex items-stretch flex-col pt-6">
                <TextArea />
                <Footer />
            </section>
        </main>
    );
}
