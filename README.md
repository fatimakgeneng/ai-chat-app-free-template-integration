# ai-chat-app
Full Stack Task: Build a Mobile Al Chat App (Frontend + Backend)

## Backend code link: <br>
https://github.com/fatimakgeneng/ai-chat-app-2/blob/main/backend/index.js <br>

## Run the backend
File path\ai-chat-app>cd backend <br>

File path\ai-chat-app\backend>node index.js <br>

Result should be like this 👇 - the backend is working<br>
`Server running on http://0.0.0.0:5000` <br>

## Test frontend using  Expo
File path\ai-chat-app>cd frontend <br>

File path\ai-chat-app\frontend>npm start<br>

A QR code like this will appear 👇, first install the Expo Go app from playstore to android, then scan the QR code via that app - the frontend is also working <br>

`Starting Metro Bundler` <br>
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▄▄ ▀█▄█▄█ ▄▄▄▄▄ █
█ █   █ ██▄▀ █ ▀▄▄█ █   █ █
█ █▄▄▄█ ██▀▄ ▄█▀█▀█ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀▄█ ▀▄█▄█▄▄▄▄▄▄▄█
█  ▀ ▄▀▄▀█▄▀█▄▀█ ▀█▄█▀█▀▀▄█
█▀█▄▄▀ ▄▀▀▄██▄▄▄▄ ▀███▄▀▀ █
█▀▀ ██▄▄█▄  █▀█▄ █ ▄▀▀█▀ ██
█ ▄▄██▀▄ ██▄█▀▄▀ ▄▀ ██▄▀  █
█▄█▄▄█▄▄▄ ▀▀ ▄▄ █ ▄▄▄  ▄▀▄█
█ ▄▄▄▄▄ ██▄▀▀▄  █ █▄█ ███ █
█ █   █ █ ▄▀▄ ▀█▄ ▄  ▄ █▀▀█
█ █▄▄▄█ █▀█▀ ▀█▄ ▄█▀▀▄█   █
█▄▄▄▄▄▄▄█▄█▄▄██▄▄▄▄█▄▄███▄█

# Miscellaneous

## Set Up for Backend (Node.js + Express) (backend is deployed on Railway to avoid IP issue)
1. Node.js installed `node -v`
2. npm installed `npm -v`
3. Initialize Node.js `npm init -y`
4. Install `npm install express cors`
5. run backend (see above)

## Set Up for Frontend (React Native + Expo)
1. Install Node.js
2. Install Expo CLI: `npm install -g expo-cli`
3. Create project via react native `expo init ai-chat-frontend`
4. See run comand above and then test it on Expo Go

## To build APK--> frontend
1. `npm install -g eas-cli`<br>
2. `eas build:configure`<br>
3. `eas build -p android --profile preview`

## UI Templates
1. NativeBase<br>
2. Dribble<br>
3. Gifted Chat<br>
4. UI8 Free Kits<br>
5. Figma<br>
