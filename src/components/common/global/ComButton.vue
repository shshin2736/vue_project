<script>
export default {
  functional: true,
  render(h, context) {
    const perm = context.data.attrs.auth;
    const perm_read =
      context.data.staticClass.includes('perm_read') && perm.includes('R')
        ? true
        : false;
    const perm_down =
      context.data.staticClass.includes('perm_down') && perm.includes('D')
        ? true
        : false;
    const perm_save =
      context.data.staticClass.includes('perm_save') && perm.includes('S')
        ? true
        : false;
    const perm_delete =
      context.data.staticClass.includes('perm_delete') && perm.includes('X')
        ? true
        : false;
    // Transparently pass any attributes, event listeners, children, etc.
    return perm_read || perm_down || perm_save || perm_delete
      ? h('button', context.data, [h('span', context.children)])
      : h(
          'button',
          {
            style: {
              opacity: 0,
            },
          },
          '',
        );
  },
};
</script>
