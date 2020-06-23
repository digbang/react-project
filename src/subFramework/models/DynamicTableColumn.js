class DynamicTableColumn {
  constructor(
    title,
    key,
    size,
    dataAccessor = null,
    titleAccessor = null,
    sortable = true,
    customTitleAlt = null
  ) {
    this.title = title
    this.key = key
    this.size = size
    this.dataAccessor = dataAccessor
    this.titleAccesor = titleAccessor
    this.sortable = sortable
    this.customTitleAlt = customTitleAlt
  }
}

export default DynamicTableColumn
