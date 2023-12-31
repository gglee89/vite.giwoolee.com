price;
mode;
widgets: Widget[];

reCalculateTotal(widget: Widget) {
  switch (this.mode) {
    case 'create':
      const newWidget = Object.assign({, widget, { id: uuidv4() }});
      this.widgets = [...this.widgets, newWidget]
      break;
    case 'update':
    this.widgets = this.widgets.map(wdgt =>
      (widget.id === wdgt.id) ? Object.assign({}, widget) : wdgt);
      break;
    case 'delete':
      this.widgets = this.widgets.filter(wdgt => widget.id !== wdgt.id);
      break;
    default:
      break;
  }

  this.price = this.widgets.reduce((acc, curr) => acc + curr.price, 0)
}
