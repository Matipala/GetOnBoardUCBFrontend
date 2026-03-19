<img width="885" height="183" alt="Colorful Community Logo" src="https://github.com/user-attachments/assets/111053c7-d317-4c8e-950a-4e57a51b3ba0" />

# Get On Board UCB - Frontend 

Plataforma de conexión laboral para estudiantes y graduados de la UCB. Enfocada en una experiencia de usuario fluida para la búsqueda de pasantías y vacantes.

##  Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linter & Formatter:** [Biome](https://biomejs.dev/) (Velocidad extrema y orden de clases de Tailwind nativo)

##  Estándares de Desarrollo

Para este repositorio utilizamos **Biome**. 
> **¿Por qué Biome?** Reemplaza a ESLint y Prettier. Formatea, revisa el código y ordena las clases de Tailwind en milisegundos, permitiendo un desarrollo ágil sin configuraciones pesadas.

## GitHub Flow
Seguimos el modelo de ramas de **GitHub Flow**:
1. `main` siempre es producción.
2. Crea una rama descriptiva para cada tarea: `feature/nombre-tarea` o `fix/nombre-error`.
3. Abre un Pull Request para revisión antes de mergear a `main`.

## Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/Matipala/GetOnBoardUCBFrontend.git](https://github.com/Matipala/GetOnBoardUCBFrontend.git)

2. Instalar dependencias:
   ```bash
   npm install

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev

## Biome
1. Instalar dependencia de Biome:
   ```bash
   npm install --save-dev --save-exact @biomejs/biome

2. Sino se creo el archivo Biome.json:
   ```bash
   npx @biomejs/biome init

3. Antes de hacer un Commit: **antes de querer guardar cambios en git, esto es una excelente para escanear el codigo, por si dejaste una variable sin usar en un archivo que cerraste sin guardar, este codigo lo detectara, lo arreglara si puede o te avisara para que lo corrijas antes de subir el codigo**
   
   ```bash
   npm run check

4. Cuando agregas muchos archivos de golpe: **este recorre todos los archivos del proyecto en milisegundos y los dejara impecables y estandarizados**
   
   ```bash
   npm run format

5. Para buscar errores fantasmas: **esto revisara todos los archivos en busca de errores de logica de react o nextjs que quizas te pasaron por alto en archivos que no tienes abiertos en ese momento**
   
   ```bash
   npm run lint

6. **Ya configurado se agrego en el packeage.json para no escribir tanto**

   ```bash
   npm run lint:fix
   ```
---
