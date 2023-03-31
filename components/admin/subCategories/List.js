
import ListItem from './ListItem'
import styles from './styles.module.scss'

export default function List({ categories, subCategories, setSubCategories }) {
  return (
    <ul className={styles.list}>
      {subCategories.map((subCategory) => (
        <ListItem
          subCategory={subCategory}
          key={subCategory._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </ul>
  );
}