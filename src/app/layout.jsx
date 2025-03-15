import Header from "@/components/Header";
import vazirFont from "@/constants/localFont";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ClientPorovider from "./ClientProvider"
import "@/styles/globals.css";


export const metadata = {
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};


export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="dark-mode" suppressHydrationWarning>
      <body className={`${vazirFont.variable} font-vazir min-h-screen`} suppressHydrationWarning>
       <AuthProvider>
         {/* <Toaster/> */}
         <ClientPorovider/>
        <div><Header/></div>
        <div className=" container xl:max-w-screen-xl">
        {children}

        </div>
       </AuthProvider>
      </body>
    </html>
  );
}
