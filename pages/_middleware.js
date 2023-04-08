import { getToken } from "next-auth/jwt"; 
// Importation de la fonction getToken du module next-auth/jwt

import  {NextResponse} from "next/server"; 
// Importation de la classe NextResponse du module next/server

export default async function middleware(req) { 
  // Définition d'une fonction asynchrone middleware avec le paramètre req
  const { pathname, origin } = req.nextUrl; 
  // Extraction de deux propriétés du paramètre req et affectation à deux variables

  const session = await getToken({
     // Appel de la fonction getToken avec un objet de configuration et affectation du résultat à la variable session
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  ; // Affichage de la variable session dans la console

  if (pathname == "/checkout") { 
    // Vérification si la propriété pathname est égale à "/checkout"
    if (!session) return NextResponse.redirect(`${origin}`); 
    // Si session n'existe pas, redirection vers l'origine
  }
  if (pathname.startsWith("/order")) { 
    // Vérification si la propriété pathname commence par "/order"
    if (!session) return NextResponse.redirect(`${origin}`); 
    // Si session n'existe pas, redirection vers l'origine
  }
  if (pathname.startsWith("/profile")) { 
    // Vérification si la propriété pathname commence par "/profile"
    if (!session) return NextResponse.redirect(`${origin}`); 
    // Si session n'existe pas, redirection vers l'origine
  }
  if (pathname.startsWith("/admin")) { 
    // Vérification si la propriété pathname commence par "/admin"
    if (!session) return NextResponse.redirect(`${origin}`); 
    // Si session n'existe pas, redirection vers l'origine
    if (session.role !== "admin") return NextResponse.redirect(`${origin}`); 
    // Si le rôle de session est différent de "admin", redirection vers l'origine
  }
}
