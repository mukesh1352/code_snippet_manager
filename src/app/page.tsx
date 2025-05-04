import Header from "./components/header";
import CodeSaver from "./components/code_saver"; // Rename to PascalCase
import Signup from "./signup/page";
export default function Home() {
  return (
    <>
      <Header />
      <CodeSaver />
      <Signup/>
    </>
  );
}
