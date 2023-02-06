import { MoonStarsFill } from "react-bootstrap-icons";
import { BrightnessHighFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

const Home = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
    if (localStorage.getItem('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
  };
  
  const enableDarkMode = () => {
        document.body.classList.add('dark');
        localStorage.setItem('dark','enabled');
        setTheme('dark');
  }
  
  const disableDarkMode = () => {
        document.body.classList.remove('dark');
        localStorage.removeItem('dark');
        setTheme('light');
  }
  
  useEffect(()=>{
      const init = () => {
          const darkMode = localStorage.getItem('dark');
          if(!darkMode) {
              enableDarkMode();
          } else {
              disableDarkMode();
          }
      }
      init();
  },[]);
  return (
    <div class="bg-gray-100 dark:bg-gray-900 max-w-screen mx-auto">
        <div class="absolute top-6 right-10 cursor-pointer" onClick={()=>toggleTheme()}>
        {theme === 'light' ? 
            <MoonStarsFill class="text-2xl"/> :
            <BrightnessHighFill class="text-white text-2xl"/>
        }
        </div>
        <div class="flex h-screen justify-center items-center">
            <div class="w-full md:w-7/12 lg:w-5/12 xl:w-4/12">
                <div class="form-card">
                    <form action="">
                        <h1 class="form-heading text-center">Secure Sharing Secret</h1>
                        <div class="mb-4">
                            <label for="secret" class="label">Enter Your Secret</label>
                            <textarea id="secret" rows='4' class="form-control"></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="expirySeconds" class="label">Expired At (Seconds)</label>
                            <input type="number" min='5' id="expirySeconds" class="form-control"/>
                        </div>
                        <div class="mt-6 mb-[.5rem] flex justify-center">
                            <input type="submit" value="Generate" class="btn bg-black px-6 py-3 dark:bg-rose-500 dark:text-white" />
                        </div>
                    </form>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Home