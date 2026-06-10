<img width="885" height="183" alt="Colorful Community Logo" src="https://github.com/user-attachments/assets/111053c7-d317-4c8e-950a-4e57a51b3ba0" />

# Get On Board UCB - Frontend 

Plataforma de conexión laboral para estudiantes y graduados de la UCB. Enfocada en una experiencia de usuario fluida para la búsqueda de pasantías y vacantes.

## Enlaces Públicos

- **Aplicación Desplegada (Producción)**: https://getonboarducb.vercel.app/

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linter & Formatter:** [Biome](https://biomejs.dev/) (Velocidad extrema y orden de clases de Tailwind nativo)

## Estándares de Desarrollo

Para este repositorio utilizamos **Biome**. 
> **¿Por qué Biome?** Reemplaza a ESLint y Prettier. Formatea, revisa el código y ordena las clases de Tailwind en milisegundos, permitiendo un desarrollo ágil sin configuraciones pesadas.

## GitHub Flow
Seguimos el modelo de ramas de **GitHub Flow**:
1. `main` siempre es producción.
2. `test` siempre es preview
3. Crea una rama descriptiva para cada tarea: `feature/nombre-tarea` o `fix/nombre-error`.
4. Abre un Pull Request para revisión en `test` antes de mergear a `main`.

## Instalación Local

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

## Comandos de Biome

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

## Pipeline CI (GitHub Actions)

El repositorio cuenta con un flujo de trabajo automatizado (`lint.yml`) configurado en GitHub Actions que actúa como guardián de la calidad del código.
- **¿Qué hace?**: Levanta un entorno aislado, instala dependencias (`npm ci`) y ejecuta `npm run lint` (Biome).
- **¿Cuándo se ejecuta?**: Automáticamente en cada `push` o `pull request` hacia las ramas `main` o `test`.
- **Objetivo**: Bloquear la integración de cualquier código que no pase las reglas del linter antes de llegar a producción o al entorno de pruebas.

---
