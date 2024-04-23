import Image from "next/image";
import NotFoundImage from "./assets/not-found.svg";

export default function NotFound() {
  return (
    <main>
      <div className="not-found" style={{ marginTop: 113 }}>
        <Image src={NotFoundImage} width={400} height={440} alt="not found" />
        <h1>404 - Not Found</h1>
      </div>
    </main>
  );
}
