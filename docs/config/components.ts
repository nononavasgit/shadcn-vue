export interface ComponentMeta {
  slug: string
  title: string
  description: string
}

export const componentMeta = [
  {
    slug: 'accordion',
    title: 'Accordion',
    description:
      'Organiza contenido relacionado en secciones expandibles con soporte single y multiple.',
  },
  {
    slug: 'alert-dialog',
    title: 'AlertDialog',
    description: 'Dialogo modal para confirmar acciones que requieren una decision explicita.',
  },
  {
    slug: 'alert',
    title: 'Alert',
    description: 'Mensaje contextual para comunicar estados, avisos y acciones de cierre.',
  },
  {
    slug: 'announcer',
    title: 'Announcer',
    description: 'Expone mensajes dinamicos a tecnologias de asistencia mediante aria-live.',
  },
  {
    slug: 'aspect-ratio',
    title: 'AspectRatio',
    description: 'Mantiene una relacion de aspecto estable para el contenido que contiene.',
  },
  {
    slug: 'attachment',
    title: 'Attachment',
    description:
      'Representa un archivo con nombre, descripcion, estado, multimedia y acciones opcionales.',
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    description:
      'Muestra una imagen, un icono o un texto de fallback dentro de un contenedor consistente.',
  },
  {
    slug: 'badge',
    title: 'Badge',
    description: 'Etiqueta compacta para estados, categorias y metadatos.',
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    description:
      'Ruta de navegación accesible con enlaces, items actuales, elipsis, iconos y slots.',
  },
  {
    slug: 'button',
    title: 'Button',
    description: 'Accion interactiva con variantes visuales, iconos y estados de carga.',
  },
  {
    slug: 'button-group',
    title: 'ButtonGroup',
    description:
      'Agrupa botones relacionados y ajusta sus bordes, espaciado y tamano de forma consistente.',
  },
  {
    slug: 'card',
    title: 'Card',
    description: 'Contenedor compuesto para agrupar contenido, acciones y un pie de tarjeta.',
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    description: 'Control booleano con soporte para valores personalizados y estado indeterminado.',
  },
  {
    slug: 'chip',
    title: 'Chip',
    description: 'Indicador compacto para mostrar valores numéricos o estados sobre otro elemento.',
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    description: 'Dialogos modales con una API plana, slots contextuales y personalizacion por UI.',
  },
  {
    slug: 'empty',
    title: 'Empty',
    description: 'Estado vacío compuesto con título, descripción, contenido y media opcionales.',
  },
  {
    slug: 'field-set',
    title: 'FieldSet',
    description: 'Agrupa campos relacionados con una leyenda y una descripcion opcionales.',
  },
  {
    slug: 'icon',
    title: 'Icon',
    description: 'Renderiza un icono Lucide con una API compacta y consistente.',
  },
  {
    slug: 'input',
    title: 'Input',
    description: 'Campo de entrada controlado para texto y valores nativos del formulario.',
  },
  {
    slug: 'input-time',
    title: 'InputTime',
    description: 'Campo de hora controlado basado en el input nativo del navegador.',
  },
  {
    slug: 'kbd',
    title: 'Kbd',
    description: 'Representa una tecla o un atajo de teclado con un estilo compacto.',
  },
  {
    slug: 'kbd-group',
    title: 'KbdGroup',
    description: 'Agrupa varias teclas Kbd para representar atajos completos.',
  },
  {
    slug: 'label',
    title: 'Label',
    description: 'Etiqueta accesible asociada a un control de formulario.',
  },
  {
    slug: 'link',
    title: 'Link',
    description:
      'Un enlace interno o externo que conserva la API visual de Button. Las unicas props propias de RouterLink son to y replace. Hereda las props, el emit click y los slots default, leading y trailing de Button, excepto as, asChild, loading y el slot loading.',
  },
  {
    slug: 'loading',
    title: 'Loading',
    description: 'Alterna entre un indicador de carga y el contenido final.',
  },
  {
    slug: 'meter-group',
    title: 'MeterGroup',
    description:
      'Medidor segmentado para representar cómo se distribuye un total entre varias categorías.',
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    description:
      'Navegación accesible entre páginas con controles, slots y personalización visual.',
  },
  {
    slug: 'popover',
    title: 'Popover',
    description:
      'Contenido flotante contextual con props planas, posicionamiento y control accesible.',
  },
  {
    slug: 'progress',
    title: 'Progress',
    description:
      'Barra de progreso accesible con valores controlados, estado indeterminado, colores y slots.',
  },
  {
    slug: 'progress-circular',
    title: 'ProgressCircular',
    description:
      'Progreso circular accesible con valores controlados, estado indeterminado, colores y slots.',
  },
  {
    slug: 'ribbon',
    title: 'Ribbon',
    description: 'Cinta diagonal decorativa para destacar una tarjeta o contenido.',
  },
  {
    slug: 'scroll-area',
    title: 'ScrollArea',
    description: 'Contenedor de desplazamiento con barras verticales, horizontales o ambas.',
  },
  {
    slug: 'search',
    title: 'Search',
    description: 'Formulario semántico para agrupar controles y acciones de búsqueda.',
  },
  {
    slug: 'separator',
    title: 'Separator',
    description: 'Divide visual y semánticamente grupos de contenido relacionados.',
  },
  {
    slug: 'slider',
    title: 'Slider',
    description: 'Control de rango con uno o varios thumbs, orientación y valores controlados.',
  },
  {
    slug: 'splitter',
    title: 'Splitter',
    description:
      'Divide una zona en paneles redimensionables, con orientación horizontal o vertical y contenido personalizado mediante slots.',
  },
  {
    slug: 'switch',
    title: 'Switch',
    description: 'Control binario con valores personalizados y contexto para su thumb.',
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    description:
      'Navegación por pestañas accesible con orientación, variantes, items y slots dinámicos.',
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    description: 'Campo de texto multilínea controlado para introducir contenido largo.',
  },
  {
    slug: 'tag-input',
    title: 'TagInput',
    description: 'Campo accesible para introducir y gestionar varias etiquetas.',
  },
  {
    slug: 'time',
    title: 'Time',
    description: 'Representa una fecha semantica con formato localizado y contexto para el slot.',
  },
  {
    slug: 'toggle',
    title: 'Toggle',
    description: 'Control binario con variantes, iconos y contexto de estado para sus slots.',
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'Mensajes contextuales con props planas, posiciones y contenido personalizable.',
  },
] satisfies ComponentMeta[]

export const componentMetaBySlug = Object.fromEntries(
  componentMeta.map((component) => [component.slug, component]),
) as Record<string, ComponentMeta>
