import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../Components';
import { useSelector, useDispatch } from 'react-redux';

 import { setCategory, setSortBy } from '../Redux/actions/filters';
 import { fetchPizzas } from '../Redux/actions/pizzas';
 import {addPizzaToCart} from '../Redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
 const sortIems = [
   { name: 'популярности', type: 'popular', order: 'desc' },
   { name: 'цене', type: 'price', order: 'desc' },
   { name: 'алфавит', type: 'name', order: 'asc' },
 ];

 function Home() {
   const dispatch = useDispatch();
   const items = useSelector(({ pizzas }) => pizzas.items);
   const cartItems = useSelector(({cart}) => cart.items);
   const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
   const { category, sortBy } = useSelector(({ filters }) => filters);

   React.useEffect(() => {
     dispatch(fetchPizzas(sortBy, category));
   }, [category, sortBy]);

   const onSelectCategory = React.useCallback((index) => {
     dispatch(setCategory(index));
   }, []);

   const onSelectSortType = React.useCallback((type) => {
     dispatch(setSortBy(type));
   }, []);
   const handleAddPizzaToCart = obj =>{
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  }
   return (
    <div className="container">
      <div className="content__top">
        <Categories
        activeCategory={category}
        onClickCategory={onSelectCategory}
        items={categoryNames}
      />
      <SortPopup
      activeSortType={sortBy.type}
      items={sortIems}
      onClickSortType={addPizzaToCart}
    />
  </div>
  <h2 className="content__title">Все пиццы</h2>
  <div className="content__items">
  {isLoaded
           ? items.map((obj) => <PizzaBlock addedCount = {cartItems[obj.id] && cartItems[obj.id].items.length}  
                                  onClickAddPizza={handleAddPizzaToCart} key={obj.id} isLoading={true} {...obj} />)
           : Array(12)
               .fill(0)
               .map((_, index) => <PizzaLoadingBlock key={index} />)}
       </div>
     </div>
   );
  }


export default Home;