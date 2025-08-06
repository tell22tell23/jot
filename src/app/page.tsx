import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import TextArea from "@/components/textarea";

export default function Home() {
    return (
        <main className="max-w-4xl mx-auto h-dvh font-mono gap-x-4">
            <div className="h-full md:hidden flex items-center justify-center flex-col gap-4 px-4">
                <h1 className="text-2xl font-bold">Go to desktop.</h1>
                <p className="text-md text-muted-foreground text-center">
                    I don't have time for mobile responsiveness, I have a life.
                </p>
            </div>

            <div className="h-full hidden md:flex items-stretch justify-center px-4">
                <Sidebar />
                <section className="max-w-2xl mx-auto h-full w-full flex items-stretch flex-col pt-6">
                    <TextArea />
                    <Footer />
                </section>
            </div>
        </main>
    );
}
