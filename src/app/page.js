import Products from "@/components/Products";
import { UserProvider } from "../components/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <div className="mt-20 w-[1100px] mx-auto">
        <Products />
      </div>
    </UserProvider>
  );
}
