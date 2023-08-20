import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RolesList } from './Pages/Roles/RolesList';
import { RolesCreate } from './Pages/Roles/RolesCreate';
import { Admin } from './Admin/Admin';
import { UsuariosList } from './Pages/Usuarios/UsuariosList';
import { UsuariosCreate } from './Pages/Usuarios/UsuariosCreate';
import { UsuariosEdit } from './Pages/Usuarios/UsuariosEdit';
import { ClientesList } from './Pages/Clientes/ClientesList';
import { ClientesCreate } from './Pages/Clientes/ClientesCreate';
import { ClientesEdit } from './Pages/Clientes/ClientesEdit';
import { ProveedoresList } from './Pages/Proveedores/ProveedoresList';
import { ProveedoresCreate } from './Pages/Proveedores/ProveedoresCreate';
import { ProveedoresEdit } from './Pages/Proveedores/ProveedoresEdit';
import { VentasList } from './Pages/Ventas/VentasList';
import { VentasCreate } from './Pages/Ventas/VentasCreate';
import {VentasEdit } from "./Pages/Ventas/VentasEdit";
import { PedidosList } from './Pages/Pedidos/PedidosList';
import { PedidosCreate } from './Pages/Pedidos/PedidosCreate';
import { PedidosEdit } from './Pages/Pedidos/PedidosEdit';
import { User } from './User/User';
import { HomeUser } from './Pages/Home/HomeUser';
import { About } from './Pages/About/About';
import { GlobalProvider } from './Context/GlobalState';
import { ForgotPassword } from './Pages/ForgotPassword/ForgotPassword';
import { UserCart } from './Pages/UserCart/UserCart';
import { AdminProfile } from './Pages/AdminProfile/AdminProfile';

export default function App() {
	return (
		<GlobalProvider>
			<HashRouter basename='/'>
				<div className='App'>
					<Routes>
						<Route path='/' element={<User />}>
							<Route path='/' element={<HomeUser />} />
							<Route path='about' element={<About />} />
						</Route>
						<Route path='/admin/*' element={<Admin />}>
							<Route path='home' element={<h1>Some</h1>} />
							<Route path='roles' element={<RolesList />} />
							<Route path='roles/create' element={<RolesCreate />} />
							<Route path='usuarios' element={<UsuariosList />} />
							<Route path='usuarios/create' element={<UsuariosCreate />} />
							<Route path='usuarios/edit/' element={<UsuariosEdit />} />
							<Route path='clientes' element={<ClientesList/>}/>
							<Route path= 'clientes/create' element={<ClientesCreate/>}/>
							<Route path= 'clientes/edit' element={<ClientesEdit/>}/>
							<Route path='proveedores' element={<ProveedoresList/>}/>
							<Route path='proveedores/create' element={<ProveedoresCreate/>}/>
							<Route path='proveedores/edit' element={<ProveedoresEdit/>}/>
							<Route path='ventas' element={<VentasList/>}/>
							<Route path='ventas/create' element={<VentasCreate/>}/>
							<Route path='ventas/edit' element={<VentasEdit/>}/>
							<Route path='pedidos' element={<PedidosList/>}/>
							<Route path='pedidos/create' element={<PedidosCreate/>}/>
							<Route path='pedidos/edit' element={<PedidosEdit/>}/>
							<Route path='profile' element={<AdminProfile/>}/>
						</Route>
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/cart' element={<UserCart />} />
					</Routes>
				</div>
			</HashRouter>
		</GlobalProvider>
	);
}
