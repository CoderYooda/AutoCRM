<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;


class LoginTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    /* @test */
    public function test_user_cannot_login()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user);

        $this->get('/login')
            ->assertRedirect('/');

        //$response->assertStatus(200);
    }
}
