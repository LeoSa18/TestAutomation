import { test, expect } from '@playwright/test';
const baseUrl = 'https://api.demoblaze.com/';


test.describe('2. Login API Test', () => {
    test ('2. Status 200 - Login exitoso', async ({request})=>{  
        const response = await request.post(`${baseUrl}/login`,{
            data:{
                username: 'username',
                password: 'password'
            }
        })
        expect(response.status()).toBe(200);
    });
    test('Respuesta contiene auth token',async({request}) => {
        const response = await request.post(`${baseUrl}/login`,{
            data:{
                username: 'user25.05.12',
                password: 'user25.05.12'
            }
        })
        const responseBody = await response.text();
        console.log('Response Body: ', responseBody);
    })
});

test.describe('signup',()=>{
    test ('2. Status 200 - Sign up exitoso', async ({request}) => {  
        const username = 'user25.05.12_4';
        const password = 'user25.05.12_4';
        const response = await request.post(`${baseUrl}/signup`,{
            data:{
                username: username,
                password: password
            }
        })
        console.log(response.status());

        const responseLogin = await request.post(`${baseUrl}/login`,{
            data:{
                username: username,
                password: password
            }
        })
        const responseBody = await responseLogin.text();
        console.log('Response Body: ', responseBody);
    });
})

test.describe('add to cart',() => {
    test ('Add to cart exitoso', async ({request}) => { 
        const response = await request.post(`${baseUrl}/addtocart`,{
            data:{
                id: "1",       
                cookie: "user=pruebademo",
                flag: true,   
                prod_id: "1"
            }
        })
        const responseBody = await responseBody.text();
        console.log(responseBody)
    })
})
