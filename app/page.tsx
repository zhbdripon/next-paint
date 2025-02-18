import ActionBar from "./components/ActionBar";
import DrawBar from "./components/DrawBar";
import DrawingCanvas from "./components/DrawCanvas";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="md:flex md:column h-app-main">
        <ActionBar />
        <DrawBar />
        <DrawingCanvas />
      </div>
    </div>
  );
}
