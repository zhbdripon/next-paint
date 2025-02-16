import ActionBar from "./components/actionBar";
import DrawBar from "./components/drawBar";
import DrawingCanvas from "./components/drawCanvas";
import Header from "./components/header";

export default function Home() {
  return <div className="h-screen w-screen">
    <Header />
    <div className="flex column h-app-main">
      <ActionBar />
      <DrawBar />
      <DrawingCanvas />
    </div>
  </div>;
}
