import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartitems, setCartitems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "https://food-1-pjg5.onrender.com";

    const addtocart = async (itemid) => {
        console.log("Item id received on the add to cart",itemid);
        setCartitems((prev) => ({
            ...prev,
            [itemid]: (prev[itemid] || 0) + 1,
        }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemid }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemid) => {
        setCartitems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemid] > 1) {
                newCart[itemid] -= 1;
            } else {
                delete newCart[itemid];
            }
            return newCart;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemid }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                const itemInfo = food_list.find((product) => String(product._id) === String(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartitems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const localCartData = async (storedToken) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: storedToken } });
            setCartitems(response.data.cartData);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    useEffect(() => {
        const localData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await localCartData(storedToken);
            }
        };
        localData();
    }, []);

    const contextValue = {
        food_list,
        cartitems,
        addtocart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
