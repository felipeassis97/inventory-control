import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeView from '../../ui/views/HomeView';
import AddProductView from '../../ui/views/AddProductView';
import FavoritesView from '../../ui/views/FavoritesView';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Ionicons.glyphMap; // Garante que o ícone seja válido

                    // Mapeia o ícone de acordo com a rota
                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'addProduct') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else {
                        iconName = 'help-outline'; // Ícone padrão caso a rota não seja reconhecida
                    }

                    // Retorna o ícone da biblioteca Ionicons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#67C4A7', // Cor para o ícone selecionado
                tabBarInactiveTintColor: '#777', // Cor para o ícone não selecionado
                tabBarStyle: {
                    backgroundColor: '#f8f8f8', // Cor de fundo da TabBar
                    borderTopColor: '#ddd', // Borda superior
                    height: 80, // Aumentando a altura da TabBar
                    paddingBottom: 8, // Mais espaço inferior
                    paddingTop: 8, // Mais espaço superior
                },
                tabBarLabelStyle: {
                    fontSize: 14, // Tamanho da fonte dos rótulos
                    marginBottom: 10, // Ajuste da margem inferior para os rótulos
                },
            })}
        >
            <Tab.Screen
                name="home"
                component={HomeView}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="addProduct"
                component={AddProductView}
                options={{
                    tabBarLabel: 'Add',
                }}
            />
            <Tab.Screen
                name="favorites"
                component={FavoritesView}
                options={{
                    tabBarLabel: 'Favorites',
                }}
            />
        </Tab.Navigator>
    );
}