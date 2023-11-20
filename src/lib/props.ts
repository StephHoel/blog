export const Path = {
  home: '/blog/',
  login: '/blog/login',
  register: '/blog/register',
  dash: '/blog/dash',
  new: '/blog/new',
  edit: '/blog/edit',
}

export const State = {
  DRAFT: 'DRAFT',
  POST: 'POST',
  DELETE: 'DELETE',
}

export const Style = {
  button: {
    all: 'rounded my-2 p-2 select-none ',
    not: 'pointer-events-none text-2xl bg-french/50 ',
    yes: 'pointer-events-auto bg-french hover:bg-french/80 ',
    post: 'w-1/2 text-black ',
  },

  table: {
    icons: 'flex gap-1 text-4xl ',
    iconsInactive: 'text-transparent pointer-events-none ',
    iconsActive:
      'cursor-pointer text-black hover:text-black/30 pointer-events-auto  ',

    title:
      'font-bold text-2xl text-center border-black border-b w-full justify-center ',
    separator: 'border-l border-black px-2 h-full flex items-center ',
  },

  page: {
    title: 'lg:text-5xl sm:text-3xl font-bold my-4 text-center ',
    subtitle: 'text-left lg:text-3xl sm:text-2xl ',
  },

  input: 'p-2 rounded outline-none ',
  form: 'w-1/2 mx-auto grid gap-4 pt-4 ',
  label: 'text-left ',
  title: 'text-center mb-4 text-6xl ',
  divError: 'text-error rounded select-none text-left mt-2 ',
}
