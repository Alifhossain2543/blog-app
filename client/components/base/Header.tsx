import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from "react-query"
import axios from 'axios'
import {logout, login, changeState} from '../../store/userSlice'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Header = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.users.isLogin)
  const [isLoading, setIsLoading] = useState(true)
  const notify = () => toast.success('Logout successfull.')
  const router = useRouter()

  const userSignout = async () => {
     await axios.get("/api/v1/auth/logout")
    dispatch(logout())
    localStorage.removeItem('user')
    dispatch(changeState({isLogin: false}))
    notify()
    router.push('/login')
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const signupInfo = useQuery("logout", userSignout, {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const signoutHandler = () => {
    signupInfo.refetch()
  }


  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (userData) {
      const user = JSON.parse(userData) as {
        id: number
        fullName: string
        email: string
      }
      dispatch(login({ user: user }))
    }
  }, [dispatch])

  return (
    <>
      <div className="border min-h-50">
        <div className="border min-vh-20  w-100 flex flex-row d-flex align-items-center justify-content-between ">
          <Link href="/">
            <h5 className="px-4" style={{ cursor: "pointer" }}>
              Micro-BLOG
            </h5>
          </Link>
          {!isLoading && (
            <>
              <div className="px-5 hstack gap-4">
                {!isLogin ? (
                  <>
                    {" "}
                    <Link href={"/login"}>
                      <button type="button" className="btn  btn-primary">
                        Login
                      </button>
                    </Link>
                    <Link href={"/signup"}>
                      <button
                        type="button"
                        className="btn  btn-outline-primary"
                      >
                        Signup
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button onClick={() => router.push('/add-post')} type="button" className="btn  btn-outline-primary">
                      Add Post
                    </button>
                    <button
                      onClick={signoutHandler}
                      type="button"
                      className="btn  bt
                    n-outline-secondary"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header;
