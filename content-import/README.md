# Template Content import

Import `TemplateCategory.csv` into the `TemplateCategory` folder and `TemplateItem.csv` into the `TemplateItem` folder.

The category-to-template relation is not included in Kooboo's CSV export. After importing, assign the `Templates` relation on each category as follows:

- E-commerce: all eight items
- Website: Fresh Market, Aviza Fashion, Quiet Interiors, Vesper Studio, Journey Journal, Objects of Quiet Beauty, Editorial Lifestyle
- H5: Ground Shifted, Editorial Lifestyle
- Example: Vesper Studio, Journey Journal
- Application: Aviza Fashion, Objects of Quiet Beauty
- Tool: Journey Journal, Editorial Lifestyle

The gallery reads category membership directly from the `Templates` relations, so configure all relations before publishing the page.

Four previews have an exact match in the current public Template Center and include a real `TemplateId`. The other four intentionally leave `TemplateId` empty, so their action opens the Template Center list instead of an unrelated template detail.
