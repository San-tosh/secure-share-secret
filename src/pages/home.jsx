import { MoonStarsFill } from "react-bootstrap-icons";
import { BrightnessHighFill } from "react-bootstrap-icons";
import { Clipboard2 } from "react-bootstrap-icons";
import { Clipboard2Check } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateLink } from "../redux/crypto/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.crypto);
    const [theme, setTheme] = useState('dark');
    const [link, setLink] = useState(undefined);
    const [copy, setCopy] = useState(false);
    const [errors, setErrors] = useState('');
    const toggleTheme = () => {
    if (localStorage.getItem('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link);
    setCopy(true);
  }
  
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

  const formik = useFormik({
    initialValues: {
        content: '',
        passphrase: '',
        expiredAt: 0
    },
    validationSchema: Yup.object({
        content: Yup
            .string()
            .max(255)
            .required(
                'Content is required'),
        passphrase: Yup
            .string()
            .max(20)
            .min(5,'Passphrase must be atleast 5 characters.')
            .required(
                'Passphrase is required'),
        expiredAt: Yup
                .number()
                .positive().integer()
                .moreThan(10,'Minimum 10 seconds is required.')
                .required('ExpiredAt is required'),

    }),
    onSubmit: (values) => {
        generateLink(dispatch,values).then(data=> {
            setCopy(false);
            setLink(window.location.origin+'/receive?token='+data)}).catch((e)=>{
                    setErrors('Something went wrong');
            });
    }
});
  
//   const onSubmitHandler = async(e)=>{
//       setApiProcess({isProcess: true, error: false});
//       try{
//          e.preventDefault();
//           res = await api.post('core/generate-link',{...inputs})
//         setApiProcess({isProcess: false, error: false});
//       } catch(err) {
//           setApiProcess({isProcess: false, error: true});
//           console.log(err);
//       }
//   }
  
  
  return (
    <div class="bg-gray-100 dark:bg-gray-900 max-w-screen max-h-full mx-auto">
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
                            <label for="secret" class="label">Enter Your Secret</label>
                            <textarea id="secret" name="content" rows='4' class="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.loginId}
                            ></textarea>
                            <span class='text-sm text-red-500 dark:text-red-200'>
                                {formik.errors.content && formik.touched.content && formik.errors.content}
                            </span>
                        </div>
                        <div class="mb-4">
                            <label for="passphrase" class="label">Passphrase</label>
                            <input type="text" name="passphrase" id="passphrase" class="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.passphrase}
                            />
                            <span class='text-sm text-red-500 dark:text-red-200'>
                                {formik.errors.passphrase && formik.touched.passphrase && formik.errors.passphrase}
                            </span>
                        </div>
                        <div class="mb-4">
                            <label for="expirySeconds" class="label">Expired At (Seconds)</label>
                            <input type="number" name="expiredAt" id="expirySeconds" class="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.expiredAt}
                            />
                            <span class='text-sm text-red-500 dark:text-red-200'>
                                {formik.errors.expiredAt && formik.touched.expiredAt && formik.errors.expiredAt}
                            </span>
                        </div>
                        <div class="mt-6 mb-[.5rem] flex justify-center">
                            <input type="submit" value="Generate" class="btn bg-black px-6 py-3 dark:bg-rose-500 dark:text-white" />
                        </div>
                    </form>

                    {!error && link? (
                    <div class="mt-6 alert alert-success rounded pr-[15px] pt-[1px]">
                        <div class="flex flex-col justify-center items-center">
                        <div class="absolute top-2 right-2 cursor-pointer"
                                onClick={copyToClipBoard}>
                                    {!copy? 
                                    <Clipboard2 class='text-green text-md'/>
                                    : <Clipboard2Check class='text-green text-md '/> 
                                    }
                                </div>
                            <p class="py-2"><i>Generated Link:</i></p>
                            <p class=" bg-white dark:bg-gray-800 dark:text-white py-2 sm:px-3 px-2 border-dashed border-2 break-all">
                                {link}
                            </p>
                        </div>
                    </div>)
                : (errors && !link ? 
                    <div class="mt-6 alert alert-danger rounded">
                        <div class="flex flex-col justify-center items-center">
                            <p class="bg-white dark:bg-gray-800 dark:text-white py-2 px-3">
                                {errors}
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

export default Home