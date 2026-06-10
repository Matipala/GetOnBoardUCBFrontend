<img width="885" height="183" alt="Colorful Community Logo" src="https://github.com/user-attachments/assets/111053c7-d317-4c8e-950a-4e57a51b3ba0" />

# Get On Board UCB - Frontend 

Plataforma de conexión laboral para estudiantes y graduados de la UCB. Enfocada en una experiencia de usuario fluida para la búsqueda de pasantías y vacantes.

## 🌍 Enlaces Públicos

- **Repositorio Público (GitHub)**: [GetOnBoardUCBFrontend](https://github.com/Matipala/GetOnBoardUCBFrontend)
- **Aplicación Desplegada (Producción)**: [Añadir URL pública aquí]

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linter & Formatter:** [Biome](https://biomejs.dev/) (Velocidad extrema y orden de clases de Tailwind nativo)

## 🏗 Estándares de Desarrollo

Para este repositorio utilizamos **Biome**. 
> **¿Por qué Biome?** Reemplaza a ESLint y Prettier. Formatea, revisa el código y ordena las clases de Tailwind en milisegundos, permitiendo un desarrollo ágil sin configuraciones pesadas.

## 🌿 GitHub Flow
Seguimos el modelo de ramas de **GitHub Flow**:
1. `main` siempre es producción.
2. Crea una rama descriptiva para cada tarea: `feature/nombre-tarea` o `fix/nombre-error`.
3. Abre un Pull Request para revisión antes de mergear a `main`.

## 🚀 Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Matipala/GetOnBoardUCBFrontend.git
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## 🛠 Comandos de Biome

1. Instalar dependencia de Biome:
   ```bash
   npm install --save-dev --save-exact @biomejs/biome
   ```

2. Si no se creó el archivo Biome.json:
   ```bash
   npx @biomejs/biome init
   ```

3. **Antes de hacer un Commit**: Excelente para escanear el código. Detectará variables sin usar o errores, y los arreglará si puede.
   ```bash
   npm run check
   ```

4. **Cuando agregas muchos archivos de golpe**: Recorre todos los archivos en milisegundos y los dejará impecables y estandarizados.
   ```bash
   npm run format
   ```

5. **Para buscar errores ocultos**: Revisará todos los archivos en busca de errores de lógica de React o Next.js.
   ```bash
   npm run lint
   ```

6. **Comando unificado (ya configurado en package.json)**:
   ```bash
   npm run lint:fix
   ```

---
