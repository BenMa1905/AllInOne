import { NextResponse } from 'next/server'

export async function middleware(req) {
    let cookie = req.cookies;
    let token = ''

    for (const value of cookie.values()) {
        token = value
        break
    }

    if (!token) {
        console.log("NO cookie")
        if(req.url != '/'){
            return NextResponse.redirect(new URL('/', req.url))
        }else{
            return NextResponse.next();
        }
    }

    token = token.split(';')[0]
    let decoded = ''

    return await fetch(`${process.env.API_URL}/user/verifyToken`, {
        method: 'GET',
        headers: { cookie: token }
    }).then(response => response.json())
        .then(data => {
            decoded = JSON.parse(data.payload);

            if (decoded.role != 'admin' && onlyAdminPage(req.url)) {
                return NextResponse.redirect(new URL('/notfound', req.url))
            } else {
                return NextResponse.next();
            }

        }).catch(error => console.error(error))
}

export const config = {
    matcher: ["/index/:path*", "/registro/:path", "/LibroContable/:path", "/usuarios/:path"],
};

const onlyAdminPage = (url) => {

    const adminpage = ["/usuarios"]
    for (let i = 0; i < adminpage.length; i++) {
        if (adminpage[i] === url) {
            return true
        }
    }
    return true
}
