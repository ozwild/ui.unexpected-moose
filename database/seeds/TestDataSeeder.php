<?php

use Illuminate\Database\Seeder;
use App\Asset;
use App\BookingRequest;
use App\Booking;
use App\Http\Services\UserService;
use App\Http\Services\BookingService;
use App\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Support\Collection;

class TestDataSeeder extends Seeder
{
    /**
     * @var Collection
     */
    private $users;

    /**
     * @var Collection
     */
    private $assets;

    private function getRandomDuration()
    {
        $chances = collect([
            "1 hour" => 70,
            "2 hours" => 35,
            "6 hours" => 15,
            "1 day" => 10,
            "1 week" => 5,
            "1 month" => 1,
            "1 year" => 0.5
        ]);

        $randomSeed = mt_rand(0, 100);

        return $chances->keys()
            ->reduce(function ($reduction, $key) use ($chances, $randomSeed) {
                $chance = $chances[$key];
                if (!$reduction || $randomSeed < $chance) {
                    $reduction = $key;
                }
                return $reduction;
            });
    }

    private function getRandomDate()
    {
        $faker = Factory::create();
        $from = Carbon::now()->sub('2 weeks');
        $to = Carbon::now()->add('3 months');
        $date = $faker->dateTimeBetween($from, $to);
        return Carbon::instance($date);
    }

    private function createAsset()
    {
        $faker = Factory::create();
        $asset = Asset::create([
            "name" => $faker->words(mt_rand(3, 8), TRUE),
            "description" => $faker->sentences(1, TRUE),
            "picture" => "https://picsum.photos/400"
        ]);

        collect()
            ->pad(mt_rand(0, 25), null)
            ->each(function () use ($asset, $faker) {

                $asset->comments()->create([
                    "user_id" => UserService::getRobotUser()->id,
                    "title" => $faker->words(mt_rand(3, 8), TRUE),
                    "body" => $faker->text,
                ]);

            });

        return $asset;

    }

    private function createUser()
    {
        $faker = Factory::create();
        $email = $faker->email;
        $user = User::create([
            "name" => $faker->name,
            "email" => $email,
            "phone" => $faker->phoneNumber,
            "password" => Hash::make("123456789"),
            "avatar" => "https://api.adorable.io/avatars/285/" . $email,
            "api_token" => Str::random(60),
        ]);

        collect()
            ->pad(mt_rand(0, 25), null)
            ->each(function () use ($user, $faker) {

                $user->comments()->create([
                    "user_id" => UserService::getRobotUser()->id,
                    "title" => $faker->words(mt_rand(3, 8), TRUE),
                    "body" => $faker->text,
                ]);

            });

        return $user;

    }

    private function createBookingRequest(User $user, Asset $asset)
    {
        $faker = Factory::create();
        $from = $this->getRandomDate();
        $to = $from->add($this->getRandomDuration());
        $request = BookingRequest::create([
            "user_id" => $user->id,
            "asset_id" => $asset->id,
            "from" => $from,
            "to" => $to
        ]);
        $request->comments()->create([
            "user_id" => UserService::getRobotUser()->id,
            "title" => $faker->words(mt_rand(3, 8), TRUE),
            "body" => $faker->text,
        ]);
        return $request;
    }

    private function resolveRequest(BookingRequest $request)
    {
        $diceRoll = mt_rand(0, 100);
        if ($diceRoll > 70)
            BookingService::approve($request, "Request approved automatically");
        if ($diceRoll > 25)
            BookingService::approve($request, "Request rejected automatically");
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->users = collect()->pad(50, null)
            ->map(function () {
                return $this->createUser();
            });

        $this->assets = collect()->pad(10, null)
            ->map(function () {
                return $this->createAsset();
            });

        $this->assets->map(function (Asset $asset) {
            return collect()->pad(mt_rand(0, 6), null)
                ->map(function () use ($asset) {
                    $user = $this->users->random();
                    return $this->createBookingRequest($user, $asset);
                });
        })->map(function (Collection $requests) {
            $requests->each(function (BookingRequest $request) {
                $this->resolveRequest($request);
            });
        });

    }
}
