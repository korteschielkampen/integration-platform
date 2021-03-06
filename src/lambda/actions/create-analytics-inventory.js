import getSaleStatsByItem from '../models/item/statistics-sales-byitem.js'
import createMergedItems from '../models/item/merged-items.js'
import createStockStatistics from './create-stock-statistics.js'
import specialCategories from '../models/category/special-categories.js'
import colorCategories from '../models/category/color-categories.js'
import mergeItemsAndCategories from '../models/category/merge-items-categories.js'
import nestCategories from '../models/category/nest-categories.js'
import getOptions from '../api/lightspeed/read-customfieldoptions.js'

export default (sales, items, categories) => {
  console.log('Get saleslines')
  // Saleline endpoint is not used yet, extracting them from sale saleline relation
  let saleStatsByItem = getSaleStatsByItem(sales)

  console.log('Merge items')
  // Merging with complete item stats
  let itemsWithStats = createMergedItems(saleStatsByItem, items)

  console.log('Generate Stock Statistics')
  itemsWithStats = createStockStatistics(sales, items)

  console.log('Adding special categories')
  // Setting up flare, and other special categories with appropriate nodes
  categories = categories.concat(specialCategories)

  console.log('Merge sold item statistics and categories')
  // Adding item statistics to the categories
  categories = mergeItemsAndCategories(itemsWithStats, categories)

  console.log('Coloring starburst')
  // Coloring the categories for nice viewing experience
  categories = colorCategories(categories)

  console.log('Nest categories')
  // Nesting the categories to the starburst datastructure and return it
  let nestedCategories = nestCategories(categories)
  debugger
  return nestedCategories
}
