<template>
    <div class="navbar bg-base-300">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-center hidden lg:flex">
            <strong>CE Scanning Tool</strong>

            <ul class="menu menu-horizontal px-1">
                <li>
                    <a>Home</a>
                </li>
                <li>
                    <a>About</a>
                </li>
                <li>
                    <a>Contact</a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <div class="form-control mr-4">
                <input type="text" placeholder="Search" class="input input-bordered" />
            </div>

            <a class="btn">Button</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavbarComponent'
}
</script>
