import { MoonStarsFill } from "react-bootstrap-icons";
import { BrightnessHighFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { decryptLink, isTokenValid } from "../redux/crypto/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from 'axios';

const Receive = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.crypto);
    const [theme, setTheme] = useState('dark');
    const [errorMessage, setErrorMessage] = useState('');
    const [content, setContent] = useState(undefined);
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

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
        let isCancelled = false;
            if(!token) {
                setErrorMessage('Token not found');
            } else {
                if(!isCancelled) {
                isTokenValid(dispatch,token).then((data) => { }
                ).catch((e)=>{
                    setErrorMessage('Token invalid.')
                });        
                }
            }
          const darkMode = localStorage.getItem('dark');
          if(!darkMode) {
              enableDarkMode();
          } else {
              disableDarkMode();
          }
          
      return () => {
        isCancelled = true;
      }
  },[]);

  const formik = useFormik({
    initialValues: {
        passphrase: '',
    },
    validationSchema: Yup.object({
        passphrase: Yup
            .string()
            .max(20)
            .min(5,'Passphrase must be atleast 5 characters.')
            .required(
                'Passphrase is required'),
    }),
    onSubmit: (values) => {
        decryptLink(dispatch,{...values,token: token}).then(data=> 
            setContent(data)).catch((e)=>{
                    setContent(undefined);
                    setErrorMessage(e.message || 'Something went wrong');
            });
    }
});
  
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
                    <form onSubmit={formik.handleSubmit}>
                        <h1 class="form-heading text-center">Secure Sharing Secret</h1>
                        <div class="mb-4">
                            <label for="passphrase" class="label">Passphrase</label>
                            <input type="text" name="passphrase" id="passphrase" class="form-control"
                            placeholder="Enter your passphrase"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.passphrase}
                            />
                            <span class='text-sm text-red-500 dark:text-red-200'>
                                {formik.errors.passphrase && formik.touched.passphrase && formik.errors.passphrase}
                            </span>
                        </div>
                        {content ?
                        <div class="mb-4">
                            <label for="secret" class="label">Decrypted Content</label>
                            <textarea id="secret" name="content" rows='4' class="form-control"
                            value={content}
                            readOnly
                            ></textarea>
                            
                        </div>
                        : ''}
                       
                        <div class="mt-6 mb-[.5rem] flex justify-center">
                            <input type="submit" value="Decrypt" class="btn bg-black px-6 py-3 dark:bg-rose-500 dark:text-white" />
                        </div>
                    </form>
                    {!error && content? (
                    <div class="mt-6 alert alert-success rounded">
                        <div class="flex flex-col justify-center items-center">
                            <p class="py-3"><i>Decryption Successfull.</i></p>
                        </div>
                    </div>)
                : (errorMessage && !content ? 
                    <div class="mt-6 alert alert-danger rounded">
                        <div class="flex flex-col justify-center items-center">
                            <p class="bg-white dark:bg-gray-800 dark:text-white py-2 px-3">
                                {errorMessage}
                            </p>
                        </div>
                    </div> : ''
                    )}
                </div>
           </div>
        </div>
    </div>
  )
}

export default Receive