# : Velog Clone Project
> 배포 : http://www.hyeon4137.shop (AWS EC2 프리티어)

> 모델 : https://velog.io

## : Update
- 20.07 ~ 20.09(약 60일) - velog clone 도전 및 급한 마무리 (React + DRF)
- 20.11 ~ 20.12(약 30일) - 구현못했던 기능들 추가 (React + DRF)
- 21.05 ~ 21.06(약 45일) - React(Typescript, Redux, Redux-thunk) + NodeJS(Express)
를 이용한 과거코드를 리펙토링하며 새롭게 리뉴얼

## : 폴더구성
📦frontend  
 ┣ 📂public  
 ┣ 📂src  
 ┃ ┣ 📂actions  
 ┃ ┣ 📂api  
 ┃ ┣ 📂components  
 ┃ ┃ ┣ 📂AccountModal  
 ┃ ┃ ┣ 📂Detail  
 ┃ ┃ ┣ 📂Home  
 ┃ ┃ ┣ 📂MyPost  
 ┃ ┃ ┣ 📂Profile  
 ┃ ┃ ┣ 📂Update  
 ┃ ┃ ┗ 📂Write  
 ┃ ┣ 📂hooks  
 ┃ ┣ 📂loader  // -> 비동기액션이 실행될때 보여지는 loader  
 ┃ ┣ 📂pages  // -> page - components (one to many) 관계   
 ┃ ┣ 📂reducers  
 ┃ ┣ 📂styles  
 ┃ ┣ 📂thunks  
 ┗ ┗ 📂typings  // -> 재사용많이되는 타입정의  

📦backend
 ┣ 📂config  // -> db접근 config   
 ┣ 📂models // -> sequelize model  
 ┣ 📂passport // -> 로그인/회원가입의 passport    
 ┣ 📂routes     
 ┗ 📂uploads // -> 이미지 모이는곳
 
 ## : Frontend Data Flow - with Redux, Redux-Thunk  

#### pages/Home.tsx -> thunk/post.ts
첫로딩  (isContent의 값에따라 보여지는 constnets가 변경)
<img width="800" alt="home - thunk" src="https://user-images.githubusercontent.com/54474732/123266627-2b38ea80-d537-11eb-9a7b-3bdf53b2529c.png">
 
#### thunk/post.ts -> action/post.ts

<img width="800" alt="thunk - action" src="https://user-images.githubusercontent.com/54474732/123266625-2aa05400-d537-11eb-8a13-7c13c0109a48.png">


<img width="800" alt="action - reducer" src="https://user-images.githubusercontent.com/54474732/123266596-26743680-d537-11eb-9c03-c96f545e36bb.png">
<img width="800" alt="action type정의" src="https://user-images.githubusercontent.com/54474732/123266613-28d69080-d537-11eb-9959-cfac2ed9ec5d.png">
<img width="800" alt="action - reducer" src="https://user-images.githubusercontent.com/54474732/123266618-2a07bd80-d537-11eb-9a8e-3cb1524e643f.png">

 
 
 보완해야할 점 또는 아쉬웠던 점
 
