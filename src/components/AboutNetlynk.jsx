import React from "react";

import * as Rscroll from 'react-scroll'

const SrcollLink = Rscroll.Link


const AboutNetlynk = () =>{
    return(
        <>
        <div className="aboutNetlynk" id = "aboutNetlynk">
            <div className="heading">
                <img src = "./asset/img/netlynk_logo.png"
                    alt="logo"/>
                <h1>Netlynk</h1>
            </div>
            <p>
            É um facto estabelecido de que um leitor é distraído 
            pelo conteúdo legível de uma página quando analisa a 
            sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a
             uma distribuição mais ou menos normal de letras, ao 
             contrário do uso de "Conteúdo aqui, conteúdo aqui", 
             tornando-o texto legível. Muitas ferramentas de 
             publicação electrónica e editores de páginas web 
             usam actualmente o Lorem Ipsum como o modelo de 
             texto usado por omissão, e uma pesquisa por 
             "lorem ipsum" irá encontrar muitos websites 
             ainda na sua infância. Várias versões têm evoluído
              ao longo dos anos, por vezes por acidente, 
              por vezes propositadamente (como no caso do humor).
            </p>
            <div className="getStarted">
                <SrcollLink to="loginSignup" smooth = {true} duration={1000}>
                <button>Get Started</button>
                </SrcollLink>
            </div>
        </div>
        </>
    )
}

export default AboutNetlynk