# Prueba de Desarrollo FullStack

## Funcionalidades
1. **Página de Producto**: Muestra los productos disponibles en el inventario, incluyendo descripción y precio.
2. **Proceso de Pago**: Permite al usuario ingresar información de la tarjeta de crédito y datos de entrega.
3. **Resumen del Pago**: Muestra un resumen con el estado de la transacción el producto comprado y los datos de entrega.
4. **Gestión de Transacciones**: Crea y actualiza transacciones en el backend integrandose con la API de pasarela.
5. **Actualización de Inventario**: Reduce la cantidad de productos en el inventario tras una compra exitosa.

## Tecnologías Utilizadas

### Frontend
- ReactJS
- Redux Toolkit para manejo del estado global
- SaSS para estilos
- React Hook Form para validación de Formularios

- ### Backend
- NestJS
- Prisma ORM con PostgreSQL
- Arquitectura Hexagonal y Patrón de Puertos y Adaptadores

### Frontend
- `/src`: Código fuente de la aplicación React.
- `/src/components`: Componentes reutilizables.
- `/src/features`: Configuración de Redux y slices.
- `/src/app`: Configuracion store de Redux.

### Backend
- `/src`: Código fuente de la API NestJS.
- `/src/modules`: Módulos organizados por funcionalidades (productos, transacciones, etc.).
- `/src/integrations`: Integraciones con servicios externos
- `/prisma`: Archivos de configuración y migración de Prisma.

## Endpoints de la API
- ### Productos
- `GET /products`: Obtener lista de productos.
- `POST /products/create`: Obtener detalles de un producto.

### Transacciones
- `POST /transactions`: Crear una nueva transacción.

## Despliegue

- El backend y la base de datos están desplegados en Render
- El Frontend está desplegada en Netlify
- URL de la app: https://frontendtestjob.netlify.app/


##Modelo base de Datos
![image](https://github.com/user-attachments/assets/e7f3661a-f08a-49b3-a9e9-14d717a4d1dd)


#Autor:
Carlos Andrés Pavas Correa
