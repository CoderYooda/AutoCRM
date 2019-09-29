<li class="dropdown d-flex align-items-center">
    <a href="#" data-toggle="dropdown" class="d-flex align-items-center">
        <span class="avatar w-32 mr-3">
          <img src="{{ asset('images/noavatar.png') }}" alt="...">
        </span>
        {{ Auth::user()->name }}
    </a>
    <div class="dropdown-menu dropdown-menu-right w pt-0 mt-2 animate fadeIn">
        <div class="row no-gutters b-b mb-2">
            <div class="col-4 b-r">
                <a href="app.user.html" class="py-2 pt-3 d-block text-center">
                    <i class="fa text-md fa-phone-square text-muted"></i>
                    <small class="d-block">Call</small>
                </a>
            </div>
            <div class="col-4 b-r">
                <a href="app.message.html" class="py-2 pt-3 d-block text-center">
                    <i class="fa text-md fa-comment text-muted"></i>
                    <small class="d-block">Chat</small>
                </a>
            </div>
            <div class="col-4">
                <a href="app.inbox.html" class="py-2 pt-3 d-block text-center">
                    <i class="fa text-md fa-envelope text-muted"></i>
                    <small class="d-block">Email</small>
                </a>
            </div>
        </div>
        <a class="dropdown-item" href="profile.html">
            <span>Profile</span>
        </a>
        <a class="dropdown-item" href="setting.html">
            <span>Settings</span>
        </a>
        <a class="dropdown-item" href="app.inbox.html">
            <span class="float-right"><span class="badge info">6</span></span>
            <span>Inbox</span>
        </a>
        <a class="dropdown-item" href="app.message.html">
            <span>Message</span>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="docs.html">
            Need help?
        </a>
        <a class="dropdown-item" href="signin.html">Sign out</a>
    </div>
</li>