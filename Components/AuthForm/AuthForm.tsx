"use client"
import React, { useState } from 'react'

import styles from './AuthForm.module.css'


import { useRouter } from 'next/navigation'

// For Components
import { InputBox } from '@/Components/InputBox/InputBox'
import { UploadDropzone } from '@/utils/uploadthing'
import Link from 'next/link'
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'


// NEXT AUTH
import { signIn } from 'next-auth/react'

export const AuthForm = () => {

    const router = useRouter()

    // For Input Fields
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [imageUpload, setImageUpload] = useState<string>('')

    // For FieldValidation
    const [fieldValidation, setFieldValidation] = useState<string>('')

    // For Error/Success Message
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    // For Loading State
    const [loading, setLoading] = useState<boolean>(false)


    // Varient
    const [varient, setVarient] = useState<'Login' | 'Register'>('Login')


    // To Switch Varient
    const SwitchVarient = () => {
        setVarient(varient === 'Login' ? 'Register' : 'Login')
    }


    // For  Login
    const LoginNow: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        // Small Validation
        if (!email.trim()) {
            setFieldValidation('Email is Required')
            document.getElementById('Email')?.focus()
            return
        }
        // To Check Email Format
        else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )) {
            setFieldValidation('Invalid Email Format')
            document.getElementById('Email')?.focus()
            return
        } else if (!password.trim()) {
            setFieldValidation('Password is Required')
            document.getElementById('Password')?.focus()
            return
        }

        setFieldValidation('')

        // 
        try {
            setLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if (res?.error) {
                console.log(res.error)
                setSuccessMessage('')
                setErrorMessage('Wrong Credentials')
                return
            }

            // if All Set Then
            router.push('/Home')

        } catch (error) {
            setErrorMessage('Something Went Wrong! Try Again')
            return

        } finally {
            setLoading(false)
        }

    }


    // For Register Now
    const RegisterNow: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()


        // Small Validation
        if (!name.trim()) {
            setFieldValidation('Name is Required')
            document.getElementById('Name')?.focus()
            return
        } else if (!email.trim()) {
            setFieldValidation('Email is Required')
            document.getElementById('Email')?.focus()
            return
        }
        // To Check Email Format
        else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )) {
            setFieldValidation('Invalid Email Format')
            document.getElementById('Email')?.focus()
            return
        } else if (!password.trim()) {
            setFieldValidation('Password is Required')
            document.getElementById('Password')?.focus()
            return
        } else if (password.trim().length < 5) {
            setFieldValidation('Password is Short')
            document.getElementById('Password')?.focus()
            return
        } else if (!imageUpload) {
            setFieldValidation('Image is Required')
            document.getElementById('imageUpload')?.focus()
            return
        }
        setFieldValidation('')


        // if All Set Then
        try {
            setLoading(true)

            // API  REQ TO CHECK WHETHER THE EMAIL ID IS ALREADY  EXISTS OR NOT
            const checkUserExists: Response = await fetch('/api/auth/UserExists', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email
                })
            })

            const { UserCheck } = await checkUserExists.json()

            if (UserCheck) {
                setSuccessMessage('')
                setErrorMessage('User Already Exists')
                setName('')
                setEmail('')
                setPassword('')
                setImageUpload('')
                return
            }





            // API REQ TO REGISTER NEW USER
            const res: Response = await fetch('/api/auth/Register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password, imageUpload
                })
            })

            if (res.ok) {
                setErrorMessage('')
                setSuccessMessage('Account Created! Login Now')
                setName('')
                setEmail('')
                setPassword('')
                setImageUpload('')
                SwitchVarient()
                return

            }
            setErrorMessage('Internal Server Error! Try Again')
            return

        }
        catch (error) {
            setErrorMessage('Something Went Wrong! Try Again')
            return

        } finally {
            setLoading(false)
        }


    }


    return (
        <div className={styles.AuthForm}>
            <form onSubmit={varient === 'Login' ? LoginNow : RegisterNow}>
                <h6>
                    {varient === 'Login' ? 'Login Now' : 'Register Now'}
                </h6>

                {/*  */}

                {
                    varient === 'Register' && (
                        <InputBox
                            labelText="Your Name"
                            Id='Name'
                            value={name}
                            onchange={(e) => setName(e.target.value)}
                            fieldValidation={fieldValidation === 'Name is Required' ? fieldValidation : ''}
                            InputType='text'
                        />
                    )
                }



                <InputBox
                    labelText="Your Email"
                    Id='Email'
                    value={email}
                    InputType='email'
                    onchange={(e) => setEmail(e.target.value)}
                    fieldValidation={fieldValidation === 'Email is Required' || fieldValidation === 'Invalid Email Format' ? fieldValidation : ''}
                />
                <InputBox
                    labelText="Your Password"
                    Id='Password'
                    value={password}
                    InputType='password'
                    onchange={(e) => setPassword(e.target.value)}
                    fieldValidation={fieldValidation === 'Password is Required' || fieldValidation === 'Password is Short' ? fieldValidation : ''}
                />

                {
                    varient === 'Register' && (
                        <div className={styles.UploadThing_Parent}>
                            <label htmlFor="ImgUpload" >Upload Image</label> <span className={styles.FieldValidation_Img}>{fieldValidation === 'Image is Required' ? fieldValidation : ''}</span>
                            <div className={styles.ImgUploader}>
                                <UploadDropzone
                                    appearance={
                                        {
                                            container: {
                                                height: 300,
                                                width: 300,
                                            }, uploadIcon: {
                                                color: "#bd07da",
                                            }, label: {
                                                color: "#bd07da",
                                            },
                                            allowedContent: {
                                                color: "#bd07da",
                                            },
                                            button: {
                                                background: "#bd07da",
                                            }
                                        }
                                    }
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(file) => {
                                        // Do something with the response
                                        console.log("Files: ", file);
                                        const uploadedFile = file[0]; // access the first file in the array
                                        const url = uploadedFile['url']; // access the url property of the file using bracket notation
                                        console.log(url)
                                        setImageUpload(url);
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        // alert(`ERROR! ${error.message}`);
                                        setErrorMessage('Faile to Upload Image Try Again')
                                    }}
                                />

                                {
                                    imageUpload && (
                                        <div>
                                            <Link href={imageUpload} target='_blank'>
                                                <img src={imageUpload} loading="lazy" alt="" />
                                            </Link>
                                        </div>
                                    )
                                }


                            </div>
                        </div>
                    )
                }




                <button type='submit' className={styles.Btn}>
                    {
                        varient === 'Login' ?
                            (
                                loading ? (
                                    <ButtonWrapper>Login In...</ButtonWrapper>
                                ) : 'Login Now'
                            ) :
                            (
                                loading ? (
                                    <ButtonWrapper>Creating...</ButtonWrapper>
                                ) : "Register Now"
                            )
                    }
                </button>

                {/* For Custom Message */}
                <p className={styles.CustomMess}>
                    {varient === 'Login' ? ' Don‘t have An Account?' : 'Already Have an Account?'}
                    <span onClick={SwitchVarient}>
                        {
                            varient === 'Login' ? "Create One!" : 'Login Now!'
                        }
                    </span>

                </p>
                {/* For Error/Success Message */}
                {
                    errorMessage && (
                        <p className={styles.ErrorMessage}>{errorMessage}</p>
                    )
                }

                {
                    successMessage && (
                        <p className={styles.SuccessMessage}>{successMessage}</p>
                    )
                }





            </form>


        </div>
    )
}
