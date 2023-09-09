import React from "react"
import nookies from "nookies"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import app from "@/lib/firebase/firebase-client"
import { useRouter } from "next/navigation"

const auth = getAuth(app)

export const AuthContext = React.createContext<{ user: User | null }>({
    user: null,
})

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken()
                setUser(user)
                nookies.set(undefined, 'token', token, { path: '/' });
            } else {
                setUser(null)
                nookies.set(undefined, 'token', '', { path: '/' });
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [router])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}
