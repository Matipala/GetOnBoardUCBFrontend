El contexto manejará:

El usuario autenticado (User | null)
Estado de carga (isLoading: boolean)
Estado de error (error: string | null)
Acciones: login(email, password) y logout()

el login simulará una llamada a API con un setTimeout y validará credenciales hardcodeadas por rol.


¿Por qué un hook separado y no usar useContext directamente? Porque el hook valida que exista el contexto y te da un error útil si te olvidas de poner el Provider. Además, queda más limpio en los componentes: useAuth() en lugar de useContext(AuthContext).

Un hook simple que envuelve useContext(AuthContext) con una validación de que se use dentro del provider. Es el hook "custom reutilizable" que pide el requisito.